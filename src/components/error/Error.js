import error from '../../assets/img/error.png';

import './error.scss';

const Error = () => {
    return (
        <div className="error">
            <img src={error} alt="error"/>
        </div>
    )
}

export default Error;