import './assets/css/style.css';
import { buildForm, buildPark } from './assets/js/templateBuilder.js';

/*
Ptz9Cy3ST0P6u0j523KKEkcH2JMJiKA0ZveqeCCL

https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=Ptz9Cy3ST0P6u0j523KKEkcH2JMJiKA0ZveqeCCL


needs for input
- state selector, multiple states may be selected at once
- max results input, default is 10

needs for output
- display each park with full name, description, url, and address
- only current search results show up

- maybe if multiple states, sort by state, or get max results per state
*/

let parklist = [];

function formSubmitHandler( form ){
    // parse data from form and create requests
    let formData = new FormData( form );
    let selectedOptions = document.querySelectorAll( "#statecodes :checked" )//.selectedOptions.map( option => option.value );
    let statecodes = [...selectedOptions].map( o => o.value )//.selectedOptions.map( option => option.value );
    let maxResults = formData.get( "maxResults" );
    fetch( `https://developer.nps.gov/api/v1/parks?stateCode=${statecodes.join(",")}&limit=${maxResults}&api_key=Ptz9Cy3ST0P6u0j523KKEkcH2JMJiKA0ZveqeCCL` )
        .then( r => r.json( ) )
        .then( d => {
            parklist = d.data;
            render( );
        } );
}

function render( ){
    let h = '';
    parklist.forEach( park => h += buildPark( park ) );
    document.getElementById( "results" ).innerHTML = h;
}

function init( ){
    const main = document.createElement("main");

    main.innerHTML = buildForm( );
    let results = document.createElement( "div" );
    results.setAttribute( "id", "results" );

    main.appendChild( results );

    document.body.appendChild( main );
    
    let form = document.getElementById("parksearch");
    form.onsubmit = e => {
        e.preventDefault( );
        formSubmitHandler( e.target );
    }
}

init();