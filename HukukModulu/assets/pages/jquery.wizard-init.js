 
!function ($) {
    var FormWizard = function () { };


    FormWizard.prototype.createValidatorForm = function ($form_container) {
        $form_container.validate({
            errorPlacement: function errorPlacement(error, element) {
                element.after(error);
            }
        });
        $form_container.children("div").steps({
            headerTag: "h3",
            bodyTag: "section",
            enablePagination: true,
            transitionEffect: "slideLeft",
            onStepChanging: function (event, currentIndex, newIndex) {
                $form_container.validate().settings.ignore = ":disabled,:hidden";
                return $form_container.valid();
            },
            onFinishing: function (event, currentIndex) {
                $form_container.validate().settings.ignore = ":disabled";
                return $form_container.valid();
            },
            onFinished: function (event, currentIndex) {
                alert("FORMU GONDER....");
            }
        });

        return $form_container;
    },

    FormWizard.prototype.init = function (id) {

         
        this.createValidatorForm($("#"+id));


    },

    $.FormWizard = new FormWizard, $.FormWizard.Constructor = FormWizard
}(window.jQuery);
 
 