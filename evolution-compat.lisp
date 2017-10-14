;;; Setup.

;;; This is unnecessarily complicated, so It's a good idea to skip through lightly and
;;; hit the key chords at the indicated points.

;;; However, if you're the kind of person that needs to understand what's actually
;;; happening, I can sympathize. It's like this:
;;; 1) We're running the "simple-httpd" webserver in emacs to serve the web page
;;; 2) We're running lisp itself (happens to be sbcl for me) in it's own process
;;; 3) We're running "slime" inside emacs itself to connect to that lisp process
;;; 4) We're running parenscript (in lisp) to compile the parenscript into javascript
;;; 5) We're using skewer (in emacs) to run inject the javascript into the webpage
;;; 6) We're using trident (in emacs) to help run the code through parenscript and skewer

;;; Have fun keeping the 3 and a half contexts straight :)
;;; It does get a lot easier after a little practice

;; This section is to get emacs setup.
;; Evaluate in emacs context by putting your cursor at the end of the expression
;; and hitting (C-c m e):
(quote ;; This quote is to stop slime(lisp) running the code meant for emacs
 (progn
   ;; Setup skewer
   (progn
     (setq httpd-port 8081)  ; I'm already using the default port 8080
     (httpd-serve-directory (format "%s/" default-directory))
     (browse-url (format "http://127.0.0.1:%d/evolve.html" httpd-port)))
   )
 ;; ^^ (C-c m e) Here for all that
 )
(quote
 ;; Code for slime (not trident)
 ;; quickload will download and the parenscript files if necessary, and then load
 ;; them to make the parenscript package available
 (ql:quickload :parenscript)
 ;;                         ^^ C-c c-j (or M-x slime-eval-last-expression)
 )


(quote
 ;; Compatibility macros

 ;; These are the Parenscript macros we need to make the lisp code run
 ;; Parenscript doesn't claim to be a lisp, it's just a lispy wrapper around
 ;; javascript, so we need to provide some lisp functionality that parenscript
 ;; doesn't.

 ;; Parenscript is a lisp program, so we'll be running this code in the lisp
 ;; context (using slime).
 (progn
   ;; Use the symbols exported by the parenscript package
   ;; sbcl provides a symbol in cl-user that will collide, so we'll mark it
   ;; as shadowing to resolve that before it happens
   (import 'sb-debug:var)
   (shadow 'var)
   (use-package :parenscript)

   ;; Land of Lisp uses defparameter, but parenscript only has defvar :(
   ;; (It's not relevant, but if you need to know the difference: https://stackoverflow.com/questions/8927741/whats-difference-betritween-defvar-defparameter-setf-and-setq )
   ;; Luckily, parenscript predates 'const' in js, so we can just rewrite one to the other:
   (ps:defpsmacro defparameter (&body body)
     `(defvar ,@body))

   (ps:defpsmacro defmake (name)
     `(defmacro ,(intern (format nil "MAKE-~a" name)) (&rest props)
        `(ps:create ,@props)))

   (ps:defpsmacro define-accessor (struct-name slot-name)
     `(defmacro ,(intern (format nil "~a-~a" struct-name slot-name)) (obj)
        `(ps:getprop ,obj ,,(SYMBOL-TO-JS-STRING slot-name))))

   (ps:define-ps-symbol-macro cons list)

   (ps:defpsmacro cons (&rest args)
     `(list ,@args))

   (ps:defpsmacro defstruct (struct-name &rest slots)
     `(progn
        (defmake ,struct-name)
        ,@(loop for slot in slots collect
               `(define-accessor ,struct-name ,slot))))

   ;; We need to use a macro for gethash because it's a place
   (ps:defpsmacro gethash (key obj)
     `(ps:getprop ,obj ,key))

   ;; We need to use a macro for nth because it's a place
   (ps:defpsmacro nth (n list)
     `(getprop ,list ,n))
   )
 ;; ^^ (M-x slime-eval-last-expression) here
 )


;;; Once we've defined these macros, we can build the Parenscript
;;; Navigate to each file and then:
;;; M-x trident-compile-buffer-to-file (ret) <output-filename>
;;; You can evaluate
(quote
 ((@ location reload))
 ;;                    ^ M-x trident-eval-last-expression
 )
