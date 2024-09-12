function checkMediaType(mediaUrl) {
    if (!mediaUrl) {
        return 'unknown';  // اگر URL خالی باشد، نوع مدیا ناشناخته است
    }

    // استخراج نام فایل به همراه پسوند
    const urlParts = mediaUrl.split('?')[0].split('/');
    const fileName = urlParts[urlParts.length - 1];
    
    // بررسی می‌کنیم که آیا fileName معتبر است یا خیر
    if (!fileName || fileName.indexOf('.') === -1) {
        return 'unknown';  // اگر نام فایل معتبر نیست یا پسوند ندارد
    }

    // استخراج پسوند فایل
    const extension = fileName.split('.').pop().toLowerCase();

    // بررسی نوع مدیا بر اساس پسوند
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'];
    const videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'flv', 'wmv'];
    
    if (imageExtensions.includes(extension)) {
        return 'image';
    } else if (videoExtensions.includes(extension)) {
        return 'video';
    } else {
        return 'unknown';
    }
}

export default checkMediaType