import JustValidate from 'just-validate';
import Inputmask from "inputmask";

export const validateForms = (selector, rules, afterSend) => {
  const form = document?.querySelector(selector);
  const telSelector = form?.querySelector('input[type="tel"]');

  if (!form) {
    console.error('Нет такого селектора!');
    return false;
  }

  if (!rules) {
    console.error('Вы не передали правила валидации!');
    return false;
  }

  if (telSelector) {
    const inputMask = new Inputmask('+7 (999) 999-99-99');
    inputMask.mask(telSelector);

    for (let item of rules) {
      if (item.tel) {
        item.rules.push({
          rule: 'function',
          validator: function () {
            const phone = telSelector.inputmask.unmaskedvalue();
            return phone.length === 10;
          },
          errorMessage: item.telError
        });
      }
    }
  }

  // const validation = new JustValidate(selector);
  const validation = new JustValidate(
    '.order__form',
    {
      errorFieldCssClass: 'is-invalid',
      errorFieldStyle: {
        border: '1px solid red',
      },
      errorLabelCssClass: 'is-label-invalid',
      errorLabelStyle: {
        color: 'white',
        textDecoration: 'underlined',
      },
      focusInvalidField: true,
      lockForm: true,
      // tooltip: {
      //   position: 'left',
      // },
      errorContainer: '.errors-container',
    },

  );

  for (let item of rules) {
    validation
      .addField(item.ruleSelector, item.rules);
  }

  validation.onSuccess((ev) => {
    let formData = new FormData(ev.target);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (afterSend) {
            afterSend();
          }
          console.log('Отправлено');
        }
      }
    }

    xhr.open('POST', 'mail.php', true);
    xhr.send(formData);

    ev.target.reset();
  })

};
