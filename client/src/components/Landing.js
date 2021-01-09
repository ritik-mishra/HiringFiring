import React from 'react';
import './Landing.css'

const Landing = () => {
    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: "30px", marginTop: "50px", color: "#808080", fontWeight: "bold" }} >Welcome to the Hiring Firing!!</div>
            </div>
            <div >
                <div className="GOTtext GOTone"> Winter is coming</div>
                <div className="GOTtext GOTtwo"> So are the jobs</div>
            </div>
        </div>
    );
};

export default Landing;
