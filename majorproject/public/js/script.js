(()=>{
    "use strict";

    //Fatch all the forms we want to apply custopm Bootstrap validation style to 
    const forms = document.querySelectorAll(".needs-validation");

    //loop over them and prevent submission
Array.form(forms).forEach((form)=>{
    form.addEventListener("submit",(event)=>{
        if(!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add("was-validated");
    },
    false
);
});
})();