import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    questions: [
        {
            id: 1,
            title: 'Як оформити замовлення?',
            dscr: "Виберіть бажаний смак, кількість та додайте у кошик. Перейдіть у кошик та оформіть замовлення. Також ви можете оформити замовлення у Telegram",
            open: false,
        },
        {
            id: 2,
            title: 'Як довго йтиме замовлення?',
            dscr: "Замовлення оформлені до 15:00 відправляються цього ж дня. Термін доставки «Новою Поштою» займає від 1 до 4 днів. «Укрпоштою» займає до 6 днів. Доставка здійснюється  «Новою Поштою» та «Укрпоштою»",
            open: false,
        },
        {
            id: 3,
            title: 'Що робити, якщо ELF BAR не працює?',
            dscr: "Не панікуйте! Напишіть менеджеру і ми вирішимо вашу проблему!",
            open: false,
        },
        {
            id: 4,
            title: 'У вас оригінальний товар?',
            dscr: "У нашому магазині надано  оригінальний товар, який легко можна перевірити за QR-кодом на офіційному сайті elfbar.com.",
            open: false,
        },
    ] 
}

const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: { 
        onOpenQuestion: (state, actions) => {
            state.questions.map((item) => {
                if (item.id === actions.payload) item.open = !item.open;
            })
        }
    }
});

const {actions, reducer} = questionSlice;
export const {onOpenQuestion } = actions;
export default reducer;