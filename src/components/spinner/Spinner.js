import spinner from '../../assets/icons/spinner.gif';

import './spinner.scss';

const Spinner = ({clazz = ''}) => {
    return (
        <div className={`spinner ${clazz}`}>
            <img src={spinner} alt="spinner" />
        </div>
    )
}

export default Spinner;