
//Change format of date to DD-MM-YYYY
export function dateFormatCorrection(dateString: Date): string {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

//Change format of date to MM-DD-YYYY
export function dateFormatEU(dateString: Date): string {
    const date = new Date(dateString);

    const day = String(date.getDate()+1).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${month}-${day}-${year}`;
}
