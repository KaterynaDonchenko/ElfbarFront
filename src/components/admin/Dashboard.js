import { Card, CardHeader } from "@mui/material";
import img1 from '../../assets/img/admin1.jpg';
import img2 from '../../assets/img/admin2.jpg';
import img3 from '../../assets/img/admin3.jpg';

export const Dashboard = () => (
    <Card>
        <CardHeader title="Вітаю на адміністративній панелі" className="dashboard__title"/>
        <div className="dashboard__img-group">
            <img src={img1} alt="image" />
            <img src={img2} alt="image" />
            <img src={img3} alt="image" />
        </div>
    </Card>
);