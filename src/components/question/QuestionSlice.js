import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    question: [
        {
            title: 'Як оформити замовлення?',
            dscr: "Виберіть бажаний смак, кількість та додайте у кошик. Перейдіть у кошик та оформіть замовлення. Також ви можете оформити замовлення у Telegram",
            transform: {'transform': 'rotate(0deg)'}
        },
        {
            title: 'Як довго йтиме замовлення?',
            dscr: "Замовлення оформлені до 15:00 відправляються цього ж дня. Термін доставки «Новою Поштою» займає від 1 до 4 днів. «Укрпоштою» займає до 6 днів. Доставка здійснюється  «Новою Поштою» та «Укрпоштою»",
            transform: {'transform': 'rotate(0deg)'}
        },
        {
            title: 'Що робити, якщо ELF BAR не працює?',
            dscr: "Не панікуйте! Напишіть менеджеру і ми вирішимо вашу проблему!",
            transform: {'transform': 'rotate(0deg)'}
        },
        {
            title: 'У вас оригінальний товар?',
            dscr: "У нашому магазині надано  оригінальний товар, який легко можна перевірити за QR-кодом на офіційному сайті elfbar.com.",
            transform: {'transform': 'rotate(0deg)'}
        },
    ] 
}

const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: { 
        onChangeTransform: (state, actions) => {
            const rotade = actions.payload.transform.transform;
            const index = actions.payload.i; 
            rotade === 'rotate(0deg)' ? 
            state.question[index].transform = {'transform': 'rotate(45deg)'} : 
            state.question[index].transform = {'transform': 'rotate(0deg)'}
        }
    }
});

const {actions, reducer} = questionSlice;
export const { onChangeTransform } = actions;
export default reducer;