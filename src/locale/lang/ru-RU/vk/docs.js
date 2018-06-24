export default {
  main_config: {
    h2: 'Основные настройки',
    owner_id: {
      name: 'ID сообщества',
      info: 'Положительное число. Пусто - текущий пользователь.'
    },
    count: {
      name: 'Количество документов (от и до), включительно.'
    },
    type: {
      name: 'Фильтр',
      items: [
        'Все',
        'Текстовые документы',
        'Архивы',
        'Gif',
        'Изображения',
        'Аудио',
        'Видео',
        'Электронные книги',
        'Неизвестно'
      ]
    }
  },
  additional_config: {
    h2: 'Дополнительные настройки',
    from_ids: {
      name: 'ID авторов',
      info: 'Отрицательное значение - ID сообщества.'
    },
    exts: {
      name: 'Расширения документов',
      info: 'Без точки. Пример: png, jpg.'
    },
    texts: {
      name: 'Фразы в названии'
    },
    indicators: {
      name: 'Показатели',
      items: [
        'Размер файла (bytes)'
      ]
    }
  }
}
