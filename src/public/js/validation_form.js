function Validator(formSelector ) {

    var _this = this;
    var formElement = document.querySelector(formSelector);

    function getParent(element,selector) {
        while(element.parentElement) {
            if(element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var formRules = {};

    var validatorRules = {
        required: function (value) {
            return value ? undefined : 'Vui lòng nhập trường này';
        },
        email: function (value) {
            var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            return regex.test(value) ? undefined : 'Vui lòng nhập email';
        },
        min: function(min) {
            return function (value) {
                return value.length >= min ? undefined : 'Vui lòng nhập tối thiểu '+ min +' ký tự';
            }
        }, 
        max: function(max) {
            return function(value) {
                return value.length <= max ? undefined : 'Vui lòng nhập tối đa ' + max + ' ký tự';
            }
        }
    }

 
    //khi co element thi su ly
    if(formElement) {
        var inputs = formElement.querySelectorAll('[name][rules]')
        
        for(var input of inputs) {  
            var rules = input.getAttribute('rules').split('|');
            for(var rule of rules) {
                var ruleInfo;
                var isRuleHasValue = rule.includes(':');

                if(isRuleHasValue) {
                    ruleInfo = rule.split(':');
                    rule = ruleInfo[0];
                }

                var  ruleFunc = validatorRules[rule];

                if (isRuleHasValue) {
                    ruleFunc = ruleFunc(ruleInfo[1]);
                }                
                if(Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc);
                } else {
                    formRules[input.name] = [ruleFunc];
                }
            }            
            input.onblur = handleValidation;
            input.oninput = handleClear;
        }

        function handleValidation(event) {
            var rules = formRules[event.target.name];
            var errorMess ;

            rules.some(function(rule) {
                errorMess = rule(event.target.value);
                return errorMess;
            })
            if(errorMess) {
                var formGroup = getParent(event.target, '.form_group');
                if(formGroup) {
                    var formMess = formGroup.querySelector('.form_mess');
                    if(formMess) {
                        formMess.innerText = errorMess;
                    }
                }
            }
            return !errorMess;
        }

        function handleClear(event) {
            var formGroup = getParent(event.target, '.form_group');
            if(formGroup) {
                var formMess = formGroup.querySelector('.form_mess');
                if(formMess) {
                    formMess.innerText = '';
                }
            }
        }

    }

    // Submit Form 
    formElement.onsubmit = function(event) {
        event.preventDefault();    

        var inputs = formElement.querySelectorAll('[name][rules]');
        var isValid = true

        for (var input of inputs) {
            if(!handleValidation({target: input})) {
                isValid = false;
            }
        }
        // console.log(isValid);
        if(isValid) {
            if(typeof _this.onSubmit === 'function') {
                var enableInput = formElement.querySelectorAll('[name]');
                var formValue = Array.from(enableInput).reduce(function(values, input){

                    switch(input.type) {
                        case 'radio' : 
                            values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                            break;
                        case 'checkbox':
                            if(!input.matches(':checked')) {
                                values[input.name] = '';
                                return values;
                            }
                            if(!Array.isArray(values[input.name])) {
                                values[input.name] = [];
                            }
                            values[input.name].push(input.value);
                            break;
                        case 'file':
                            values[input.name] = input.files;
                            break;
                        default :
                            values[input.name] = input.value;
                    }
                    
                    return values;
                },{});
                //goi lai onSubmit va tra ve kem ca gia tri input
                _this.onSubmit(formValue);
            } else {
                formElement.submit();
            }
        }
     }   
}