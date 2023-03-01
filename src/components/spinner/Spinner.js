import spiner from '../../assets/icons/spiner.gif';

import './spinner.scss';

const Spinner = () => {
    return (
        <div className="spiner">
            <img src={spiner} alt="spiner" />
        </div>
    )
}

export default Spinner;