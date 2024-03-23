/* eslint-disable react/prop-types */

import "./index.css";

export default function Paragraph3({ cls, func }) {
    return (

        <p className={cls}>I went to urgent care last night and was told it should subside within {func()}hours. I do not expect to be online throughout the day.

        </p>

    );
}