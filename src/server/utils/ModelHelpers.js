module.exports = {
    /**
     * ModelHelpers.options(options)
     * Проверяет и настраивает свойства объекта options:
     * options.limit - количество записей на одной странице
     * options.page - выбранная страница
     * options.offset - начало вывода записей (с 0, количество 30)
     * options.column - выводимые колонки записей (по умолчанию: *)
     * @param {Object} options
     * @param {Function} cb
     * @return {Object} options
     *
     */
    options: function (options, cb) {
        if(typeof options == "function"){
            var callback = options;
            options = {};
            options.callback = callback;
        } else {
            //Вызов функции
            options.callback = cb && typeof cb == "function" ? cb : Console.log('Error');
        }
        //количество записей на одной странице
        options.limit = options.limit && options.limit >= 0 ? options.limit : 30;
        //страница
        options.page = options.page && options.page >= 1 ? options.page : 1;
        //начало вывода записей (с 0, количество 30)
        options.offset = options.offset && options.offset >= 0
            ? options.offset
            : options.limit * options.page - options.limit;
        //Разрешонные для отоборажения столбцы
        options.column = options.column ? options.column : "*";

        return options;
    }
};