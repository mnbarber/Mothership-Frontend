const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/charSheets`;

const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
        });
        return res.json();
    } catch(error) {
        console.log(error);
    }
};

const show = async (charSheetId) => {
    try {
        const res = await fetch(`${BASE_URL}/${charSheetId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch(error) {
        console.log(error);
    }
};

export {
    index,
    show,
};