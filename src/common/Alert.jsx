import React from "react";

function Alert({ type = "danger", messages = [] }) {
    // console.debug("Alert", "type=", type, "messages=", messages);

    return (
        <div role="alert">
            {messages.map(error => (
                <p key={error}>
                    {error}
                </p>
            ))}
        </div>
    );
}

export default Alert;
