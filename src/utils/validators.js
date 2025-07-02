export const validateDate = (string) => {
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(string)) {
      const arrDate = string.split('.');
      const dateNow = new Date().getTime();
      const dateString = new Date(`${arrDate[2]}/${arrDate[1]}/${arrDate[0]}`).getTime();
      return dateNow > dateString;
    };
    return false;
};

export const validatePassportSeries = (string) => {
    return /^\d{4}$/.test(string);
};

export const validatePassportNumber = (string) => {
    return /^\d{6}$/.test(string);
};

export const validateBirthNumber = (string) => {
    return /^[v,i,x,m]{1,4}[а-я]{1,2}\d{6}$/.test(string);
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