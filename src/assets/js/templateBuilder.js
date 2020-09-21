import { statecodes } from './statecodes.js';

function buildStateSelector( ){
    // create stateSelector, allow multiple selections
    let stateSelect = '';
    statecodes.forEach( state => stateSelect += `<option value="${state}">${state}</option>`);
    return `<label class="section--column" for="statecodes">Select State(s): <select name="statecodes" id="statecodes" multiple>${stateSelect}</select></label>`;
}

function buildMaxResults( ){
    // create max results input, default 10
    return `<label for="maxResults" class="section--column">Max Results: <input type="number" id="maxResults" name="maxResults" value="10"/></label>`;
}

function buildForm( ){
    // create form to search for parks, include state selector and max results
    return `<form class="section--column" id="parksearch">
                <div class="section--column">
                    ${buildMaxResults()}    
                    ${buildStateSelector()}
                    <button type="submit">Search</button>
                </div>
            </form>`;
}

function buildAddresses( addresses ){
    let h = '';
    addresses.forEach( a => h += `<div class="parkaddress section--column">
                                    <p><strong>Address Type: </strong>${a.type}</p>
                                    <p><strong>City: </strong>${a.city}</p>
                                    <p><strong>Street: </strong>${a.line1}${a.line2 !== "" ? ", " + a.line2 : ''}${a.line3 !== "" ? ", " + a.line3 : ''}</p>
                                    <p><strong>State/Postal: </strong>${a.stateCode}, ${a.postalCode}</p>
                                    </div>` );
    return `<div class="parkaddresses section--column">${h}</div>`;
}

function buildPark( park ){
    return `<div class="park">
                <h3>${park.fullName}</h3>
                <p>${park.description}</p>
                <a href="${park.url}">${park.url}</a>
                <p>${buildAddresses(park.addresses)}</p>
            </div>`;
}


export {
    buildForm,
    buildPark
}