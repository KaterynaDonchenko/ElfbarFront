import spiner from '../../assets/icons/spiner.gif';

import './spinner.scss';

const Spinner = ({clazz = ''}) => {
    return (
        <div className={`spiner ${clazz}`}>
            <img src={spiner} alt="spiner" />
        </div>
    )
}

export default Spinner;