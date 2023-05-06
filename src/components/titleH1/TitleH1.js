import './titleH1.scss';

const TitleH1 = ({title, classN = ''}) => {
    return (
        <h1 className={`title-h1 ${classN}`}>{title}</h1>
    )
}

export default TitleH1;