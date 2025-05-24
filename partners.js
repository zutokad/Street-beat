document.addEventListener('DOMContentLoaded', function() {
    // Находим кнопку "Отправить заявку"
    const applyButton = document.querySelector('.become-partner button');
    
    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.zIndex = '1000';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    
    // Создаем контент модального окна
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = '#fff';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '8px';
    modalContent.style.width = '80%';
    modalContent.style.maxWidth = '500px';
    
    // Заголовок модального окна
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = 'Заявка на партнерство';
    modalContent.appendChild(modalTitle);
    
    // Форма
    const form = document.createElement('form');
    form.id = 'partnerForm';
    
    // Поля формы
    const fields = [
        { type: 'text', id: 'name', label: 'Ваше имя', required: true },
        { type: 'text', id: 'company', label: 'Название компании', required: true },
        { type: 'tel', id: 'phone', label: 'Телефон', required: true },
        { type: 'email', id: 'email', label: 'Email', required: true },
        { type: 'textarea', id: 'message', label: 'Сообщение', required: false }
    ];
    
    fields.forEach(field => {
        const div = document.createElement('div');
        div.style.marginBottom = '15px';
        
        const label = document.createElement('label');
        label.setAttribute('for', field.id);
        label.textContent = field.label;
        if (field.required) {
            label.innerHTML += ' <span style="color:red">*</span>';
        }
        div.appendChild(label);
        
        let input;
        if (field.type === 'textarea') {
            input = document.createElement('textarea');
            input.style.width = '100%';
            input.style.minHeight = '100px';
        } else {
            input = document.createElement('input');
            input.type = field.type;
        }
        
        input.id = field.id;
        input.name = field.id;
        input.required = field.required;
        input.style.width = '100%';
        input.style.padding = '8px';
        input.style.boxSizing = 'border-box';
        input.style.border = '1px solid #ddd';
        input.style.borderRadius = '4px';
        
        div.appendChild(input);
        form.appendChild(div);
    });
    
    // Кнопки формы
    const buttonsDiv = document.createElement('div');
    buttonsDiv.style.display = 'flex';
    buttonsDiv.style.justifyContent = 'space-between';
    buttonsDiv.style.marginTop = '20px';
    
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Отправить';
    submitButton.style.padding = '10px 20px';
    submitButton.style.backgroundColor = '#4CAF50';
    submitButton.style.color = 'white';
    submitButton.style.border = 'none';
    submitButton.style.borderRadius = '4px';
    submitButton.style.cursor = 'pointer';
    
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.textContent = 'Закрыть';
    closeButton.style.padding = '10px 20px';
    closeButton.style.backgroundColor = '#f44336';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '4px';
    closeButton.style.cursor = 'pointer';
    
    buttonsDiv.appendChild(submitButton);
    buttonsDiv.appendChild(closeButton);
    form.appendChild(buttonsDiv);
    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Обработчик открытия модального окна
    applyButton.addEventListener('click', function() {
        modal.style.display = 'flex';
    });
    
    // Обработчик закрытия модального окна
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Закрытие при клике вне модального окна
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Валидация формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Проверка полей
        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (input.required && !input.value.trim()) {
                input.style.borderColor = 'red';
                isValid = false;
            } else {
                input.style.borderColor = '#ddd';
            }
            
            // Специальные проверки для email и телефона
            if (input.id === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    input.style.borderColor = 'red';
                    isValid = false;
                }
            }
            
            if (input.id === 'phone' && input.value) {
                const phoneRegex = /^\+?[0-9\s\-\(\)]{10,}$/;
                if (!phoneRegex.test(input.value)) {
                    input.style.borderColor = 'red';
                    isValid = false;
                }
            }
        });
        
        if (isValid) {
            // Здесь можно отправить форму (AJAX или обычная отправка)
            alert('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
            form.reset();
            modal.style.display = 'none';
        } else {
            alert('Пожалуйста, заполните все обязательные поля корректно.');
        }
    });
});c