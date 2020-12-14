import React, { Component } from 'react';
import './SortingFilters.css';

class Sortingfilters extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container">
                <div style={{ marginTop: "1rem" }} className="sorting">
                    <div style={{ textAlign: 'center' }}><b>Sort By</b></div>
                    <hr />
                    <label>
                        <input type="radio"
                            name='isReferral' value="Yes"
                            onChange={this.myChangeHandler}
                        />
                        <span >Recent Posted</span>
                    </label>&nbsp;&nbsp;&nbsp;
                            <label>
                        <input type="radio"
                            name='isReferral' value="No"
                            onChange={this.myChangeHandler}
                        />
                        <span >First Posted</span>
                    </label>
                    <label>
                        <input className="with-gap" type="radio"
                            name='isReferral' value="Maybe"
                            onChange={this.myChangeHandler}
                        />
                        <span >Recent Expiry</span>
                    </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <label>
                        <input className="with-gap" type="radio"
                            name='isReferral' value="Maybe"
                            onChange={this.myChangeHandler}
                        />
                        <span >Late Expiry</span>
                    </label>
                    <label>
                        <input className="with-gap" type="radio"
                            name='isReferral' value="Maybe"
                            onChange={this.myChangeHandler}
                        />
                        <span >Most Liked</span>
                    </label>
                </div>
                <div style={{ marginTop: "2rem" }} className="filters">
                    <div style={{ textAlign: "center" }} ><b>Filters</b></div>
                    <hr />



                    <div style={{ textAlign: "center" }} >Batch</div>
                    <p>
                        <label>
                            <input type="checkbox" name='batch' value="2020"
                                checked={false}
                                onChange={this.batchChangeHandler}
                            />
                            <span>2020</span>
                        </label>&nbsp;&nbsp;&nbsp;
                            <label>
                            <input type="checkbox" name='batch' value="2021"
                                checked={false}
                                onChange={this.batchChangeHandler}
                            />
                            <span>2021</span>
                        </label>&nbsp;&nbsp;&nbsp;
                            <label>
                            <input type="checkbox" name='batch' value="2022"
                                checked={false}
                                onChange={this.batchChangeHandler}
                            />
                            <span>2022</span>
                        </label>&nbsp;&nbsp;&nbsp;
                            <label>
                            <input type="checkbox" name='batch' value="2023"
                                checked={false}
                                onChange={this.batchChangeHandler}
                            />
                            <span>2023</span>
                        </label>&nbsp;&nbsp;&nbsp;
                            <label>
                            <input type="checkbox" name='batch' value="2024"
                                checked={false}
                                onChange={this.batchChangeHandler}
                            />
                            <span>2024</span>
                        </label>
                    </p>



                    <div style={{ textAlign: "center" }} >Role</div>
                    <p>
                        <label>
                            <input type="checkbox" name='role' value="isIntern"
                                checked={false}
                                onChange={this.roleChangeHandler}
                            />
                            <span>Intern</span>
                        </label>&nbsp;&nbsp;&nbsp;
                            <label>
                            <input type="checkbox" name='role' value="isFulltime"
                                checked={false}
                                onChange={this.roleChangeHandler}
                            />
                            <span>Full time</span>
                        </label>&nbsp;&nbsp;&nbsp;
                        </p>
                    <div style={{ textAlign: "center" }} >Company</div>
                    <input list="brow" placeholder="Select companies    " />
                    <datalist id="brow" >
                        <option value="Dunzo" />
                        <option value="CRED" />
                        <option value="Google" />
                        <option value="Media.net" />
                        <option value="MyGate" />
                    </datalist>


                    <button style={{ marginLeft: "4rem" }} class="button"><b>Apply</b></button>
                </div>
            </div >
        )
    }
};
export default Sortingfilters;
