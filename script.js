"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var html2pdf_js_1 = require("html2pdf.js"); // Import html2pdf
// Function to generate the resume dynamically
function generateResume() {
    var _a;
    // Disable the button temporarily to prevent repeated clicks
    var generateBtn = document.getElementById("generateResumeBtn");
    generateBtn.disabled = true;
    // Get profile picture (if selected)
    var profilePictureInput = document.getElementById('profilePicture');
    var profilePictureFile = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
    var profilePictureHTML = '';
    if (profilePictureFile) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            var imgSrc = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            profilePictureHTML = "<img src=\"".concat(imgSrc, "\" alt=\"Profile Picture\" style=\"max-width: 100px; border-radius: 50%; margin-bottom: 10px;\">");
            // Call resume generation after the picture is loaded
            renderResume(profilePictureHTML);
        };
        reader.readAsDataURL(profilePictureFile);
    }
    else {
        renderResume(profilePictureHTML);
    }
    function renderResume(profilePictureHTML) {
        // Collect form inputs
        var name = document.getElementById("name").value;
        var jobTitle = document.getElementById("jobTitle").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var address = document.getElementById("address").value;
        var degree1 = document.getElementById("degree1").value;
        var institution1 = document.getElementById("institution1").value;
        var degree2 = document.getElementById("degree2").value;
        var institution2 = document.getElementById("institution2").value;
        var company1 = document.getElementById("company1").value;
        var position1 = document.getElementById("position1").value;
        var company2 = document.getElementById("company2").value;
        var position2 = document.getElementById("position2").value;
        var skills = [
            document.getElementById("skill1").value,
            document.getElementById("skill2").value,
            document.getElementById("skill3").value,
            document.getElementById("skill4").value,
        ];
        var project1 = document.getElementById("project1").value;
        var projectDescription1 = document.getElementById("projectDescription1").value;
        var reference1 = document.getElementById("reference1").value;
        var referencePhone1 = document.getElementById("referencePhone1").value;
        // Generate resume content
        var resumeTemplate = "\n            ".concat(profilePictureHTML, "\n            <h2>Contact Information</h2>\n            <p><strong>Name:</strong> ").concat(name, "</p>\n            <p><strong>Job Title:</strong> ").concat(jobTitle, "</p>\n            <p><strong>Email:</strong> ").concat(email, "</p>\n            <p><strong>Phone:</strong> ").concat(phone, "</p>\n            <p><strong>Address:</strong> ").concat(address, "</p>\n\n            <h2>Education</h2>\n            <p><strong>Degree 1:</strong> ").concat(degree1, " at ").concat(institution1, "</p>\n            <p><strong>Degree 2:</strong> ").concat(degree2 ? degree2 : 'N/A', " at ").concat(institution2 ? institution2 : 'N/A', "</p>\n\n            <h2>Work Experience</h2>\n            <p><strong>Company 1:</strong> ").concat(company1, " - ").concat(position1, "</p>\n            <p><strong>Company 2:</strong> ").concat(company2 ? company2 : 'N/A', " - ").concat(position2 ? position2 : 'N/A', "</p>\n\n            <h2>Skills</h2>\n            <ul>\n                ").concat(skills.filter(function (skill) { return skill; }).map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "\n            </ul>\n\n            <h2>Projects</h2>\n            <p><strong>").concat(project1, "</strong>: ").concat(projectDescription1, "</p>\n\n            <h2>References</h2>\n            <p><strong>").concat(reference1, "</strong> - ").concat(referencePhone1, "</p>\n        ");
        var resumeOutput = document.getElementById("resumeOutput");
        resumeOutput.innerHTML = resumeTemplate;
        // Re-enable the button after processing
        generateBtn.disabled = false;
    }
}
function downloadPDF() {
    var resumeOutput = document.getElementById("resumeOutput");
    var opt = {
        margin: 1,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    (0, html2pdf_js_1.default)().from(resumeOutput).set(opt).save();
}
// Event listeners to trigger resume generation and PDF download
(_a = document.getElementById("generateResumeBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", generateResume);
(_b = document.getElementById("downloadPDFBtn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", downloadPDF);
