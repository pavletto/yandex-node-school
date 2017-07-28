var MyForm = {
    validate: function() {
        var formData = this.getData();
        var validationEl = ["fio", "phone", "email"];
        var validationFn = {
            fio: function(fio) {
                var re = /^[\S]{1,}\s[\S]{1,}\s[\S]{1,}$/;
                return re.test(fio);
            },
            email: function(email) {
                var re = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
                var validDomens = ['ya.ru', 'yandex.ru', 'yandex.ua', 'yandex.by', 'yandex.kz', 'yandex.com'];
                var valueDomain = email.split('@')[1];
                return validDomens.indexOf(valueDomain) !== -1 && re.test(email);
            },
            phone: function(phone) {
                var re1 = /[\+]\d{1}[\(]\d{3}[\)]\d{3}[\-]\d{2}[\-]\d{2}/;
                var re2 = /[\D]/g;
                var int = function(v) {
                    return parseInt(v, 10);
                };
                var sum = function(a, b) {
                    return a + b;
                };
                return re.test(phone) && phone.replace(re2, '').split('').map(int).reduce(sum) <= 30;
            }
        };
        validationEl.forEach(function(v, i, arr) {
            if (!validationFn[v](formData[v])) {
                validationEl.splice(i,1);
                document.getElementsByName(v)[0].className += " error";
            } else {
                if (document.getElementsByName(v)[0].className.indexOf('error') !== -1) document.getElementsByName(v)[0].className.replace("error", "");
            }
        });
        return {
            isValid: validationEl.length,
            errorFields: validationEl
        };
    },
    getData: function() {
        return {
            "fio": document.getElementsByName('fio')[0].value,
            "email": document.getElementsByName('email')[0].value,
            "phone": document.getElementsByName('phone')[0].value
        };
    },
    setData: function(formData) {
        for (var name in formData) {
            if (document.getElementsByName(name)[0]) document.getElementsByName(name)[0].value = formData[name];
        }
    }
};
document.getElementById('submitButton').onclick = MyForm.validate.bind(MyForm);
