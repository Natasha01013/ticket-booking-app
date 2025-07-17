export const validatePassportSeries = (string) => {
    return /^\d{4}$/.test(string);
};

export const validatePassportNumber = (string) => {
    return /^\d{6}$/.test(string);
};

export const validateBirthNumber = (string) => {
    // Убираем лишние пробелы и дефисы для нормализации перед валидацией
    const normalizedString = string.trim().toUpperCase().replace(/[- ]/g, '');

    // Формат: [Римские цифры до XV] [2 заглавные русские буквы] [6 цифр]
    // Пример: IАБ123456, IIБВ765432
    const preciseBirthCertRegex = /^(I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII|XIII|XIV|XV)[А-ЯЁ]{2}\d{6}$/;

    return preciseBirthCertRegex.test(normalizedString);
};

export const validatePhoneNumber = (number) => {
    if (!number) return false;
    
    const numberWithoutSpace = number.replace(/\s/g, "");
    const formatNumber = (num) => {
        const digits = num.replace(/\D/g, '');
        if (digits.length !== 10 && digits.length !== 11) return false;
        
        const normalizedNumber = digits.length === 10 ? `+7${digits}` : `+${digits}`;
        return normalizedNumber.match(/.{1,1}/g).join(' ');
    };

    if (/^(\+7|7|8)/.test(numberWithoutSpace)) {
        return formatNumber(numberWithoutSpace) || false;
    }
    
    return false;
}

export const validateEmail = (string) => {
    return /@/.test(string) && /\.[a-z]{2,3}$/.test(string);
};