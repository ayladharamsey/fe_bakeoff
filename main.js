//i am importing the mockData by destructuring the data being brought in. 
// not really as important here, but if you had multiple sets of data within the same file, it would be very useful 
import { mockData } from './mockData.js'

// all global variables for various dom elements that the user would interact with 
const reportList = document.querySelector('.report-list-body')
const sideTable = document.querySelector('.side-nav')
const formButton = document.querySelector('#form-button')
const resetButton = document.querySelector('#reset-button')

//corresponding global event listeners that fire once the user has interacted with the DOM 
window.addEventListener('load', createSideNav)
sideTable.addEventListener('click', viewReport)
formButton.addEventListener('click', gatherReport)
resetButton.addEventListener('click', resetPage)


// Upon window load, this function runs through the mock data and appends a table row for each piece of data
function createSideNav() {
    mockData.forEach(data => {
        reportList.insertAdjacentHTML('afterbegin', 
        `
        <tr class="report-selected" data-id=${data.id}>
            <td class="report-name">${data.name}</td>
            <td class="date-added">${data.added}</td>
        </tr>
        `)
    }) 
}

//Upon click of a table row within the side nav, this function will go through the mock data and find the rest of the data corresponding with the option chose 
// for this, we have to utilize event bubbling, to determine the correct data-id for the selected report
// it then immediately invokes another function 
function viewReport(e){
    const selectedReportId = e.target.closest('.report-selected').getAttribute('data-id')
    const correspondingData = mockData.find(data => {
        return data.id === selectedReportId
    })
    generateDataTable(correspondingData)
}

//This function is immediately invoked in the function above
//here, we are accessing an HTML element and injecting more HTML with the data that is passed from the previous function
//To inject dynamic js into the appending HTML, we must use template literals 
function generateDataTable(data){
    const table = document.querySelector('.selected-table-body')
    table.insertAdjacentHTML('afterend', 
    `
        <tr class="table-content">
            <td class="report-name">${data.name}</td>
            <td class="date-added">${data.added}</td>
            <td class="department">${data.department}</td>
            <td class="purpose">${data.purpose}</td>
            <td class="frequency">${data.frequency}</td>
            <td class="format">${data.format}</td>
            <td class="fields">${data.fields}</td>
        </tr>
    `) 
}

//This function gathers the values that are input by the user in the form area
//From that collected data, we create an object literal that depicts the structure of the data once submitted to local storage
// It also immediately sends this data to another function 
// It also immediately invokes two other functions 
function gatherReport(e) {
    e.preventDefault()
    const inputReport = document.querySelector('#input-report-name').value
    const inputFrequency = document.querySelector('#input-frequency').value
    const inputDepartment = document.querySelector('#input-department-name').value

    const formValues = {
        reportFrequency : inputFrequency,
        reportDepartment : inputDepartment
    }

    saveReport(inputReport, formValues)
    resetInputs()
    renderMessage();
}

//This function actually saves our form information to Local Storage
//We must stringify any data before setting it to local storage
//We are setting each form by the request name as a key, then submitting the data as a value.
function saveReport(reportName, reportInfo) {
    localStorage.setItem(`${reportName}`, JSON.stringify(reportInfo))
}

//This function is invoked immediately upon form submission to make the inputs reset back to empty
function resetInputs(){
    document.querySelector('#input-report-name').value = ''
    document.querySelector('#input-frequency').value = ''
    document.querySelector('#input-department-name').value = ''
}

//This function is tied to the reset button on the page, so it just refreshes the page for the user. 
function resetPage() {
    location.reload();
}

//For a better UX, I added a little alert to let the user know that their information did submit correctly. 
// It goes away after 3 seconds
function renderMessage() {
    const messageLocation = document.querySelector('.success')
    messageLocation.innerHTML = `
        <h4> Your request was successful! <h4>
        `
    setTimeout(function() {
        messageLocation.innerHTML = ''
    }, 3000)
    
}
