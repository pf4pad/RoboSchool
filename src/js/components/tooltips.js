// Подключение плагина для позиционирования тултипов
import { createPopper, right } from '@popperjs/core';

const el = document.querySelector('.tooltip__btn')

const tooltip = document.querySelector('.tooltip__txt')
createPopper(el, tooltip, {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [30, 5],
      },
    },
  ],
  placement: 'top-start'
});