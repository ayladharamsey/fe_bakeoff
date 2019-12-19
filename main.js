import { mockData } from './mockData.js'

const reportList = document.querySelector('.report-list-body')
const sideTable = document.querySelector('.side-nav')
const formButton = document.querySelector('#form-button')
const resetButton = document.querySelector('#reset-button')

window.addEventListener('load', createSideNav)
sideTable.addEventListener('click', viewReport)
formButton.addEventListener('click', gatherReport)
resetButton.addEventListener('click', resetPage)


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

function viewReport(e) {
    const selectedReportId = e.target.closest('.report-selected').getAttribute('data-id')
    const correspondingData = mockData.find(data => {
        return data.id === selectedReportId
    })
    generateDataTable(correspondingData)
}

function generateDataTable(data) {
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

function gatherReport(e) {
    e.preventDefault()
    const inputReport = document.querySelector('#input-report-name').value
    const inputFrequency = document.querySelector('#input-frequency').value
    const inputDepartment = document.querySelector('#input-department-name').value

    const formValues = {
        reportFrequency : inputFrequency,
        reportDepartment : inputDepartment
    }

    saveReport(inputReport, formValues);
    resetInputs();
    renderMessage();
}

function saveReport(reportName, reportInfo) {
    localStorage.setItem(`${reportName}`, JSON.stringify(reportInfo))
}

function resetInputs() {
    document.querySelector('#input-report-name').value = ''
    document.querySelector('#input-frequency').value = ''
    document.querySelector('#input-department-name').value = ''
}

function resetPage() {
    location.reload();
}

function renderMessage() {
    const messageLocation = document.querySelector('.success')
    messageLocation.innerHTML = `
        <h4> Your request was successful! <h4>
        `
    setTimeout(function() {
        messageLocation.innerHTML = ''
    }, 3000)
    
}
