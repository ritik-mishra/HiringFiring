import React from 'react';
import './Landing.css'

const Landing = () => {
    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: "30px", marginTop: "50px", color: "#808080", fontWeight: "bold" }} >Welcome to the Hiring Firing!!</div>
            </div>
            <div >
                <div style={{ display: 'flex', justifyContent: 'center', fontSize: "50px", marginTop: "50px" }} className="GOTtext"> Winter is coming</div>
                <div style={{ display: 'flex', justifyContent: 'center', fontSize: "40px", marginTop: "20px" }} className="GOTtext"> So are the jobs</div>
            </div>
        </div>
    );
};

export default Landing;
