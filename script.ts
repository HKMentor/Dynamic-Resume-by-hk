import html2pdf from 'html2pdf.js'; // Import html2pdf

// Function to generate the resume dynamically
function generateResume() {
    // Disable the button temporarily to prevent repeated clicks
    const generateBtn = document.getElementById("generateResumeBtn") as HTMLButtonElement;
    generateBtn.disabled = true;

    // Get profile picture (if selected)
    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
    const profilePictureFile = profilePictureInput.files?.[0];

    let profilePictureHTML = '';
    if (profilePictureFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imgSrc = e.target?.result as string;
            profilePictureHTML = `<img src="${imgSrc}" alt="Profile Picture" style="max-width: 100px; border-radius: 50%; margin-bottom: 10px;">`;

            // Call resume generation after the picture is loaded
            renderResume(profilePictureHTML);
        };
        reader.readAsDataURL(profilePictureFile);
    } else {
        renderResume(profilePictureHTML);
    }

    function renderResume(profilePictureHTML: string) {
        // Collect form inputs
        const name = (document.getElementById("name") as HTMLInputElement).value;
        const jobTitle = (document.getElementById("jobTitle") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const phone = (document.getElementById("phone") as HTMLInputElement).value;
        const address = (document.getElementById("address") as HTMLInputElement).value;

        const degree1 = (document.getElementById("degree1") as HTMLInputElement).value;
        const institution1 = (document.getElementById("institution1") as HTMLInputElement).value;
        const degree2 = (document.getElementById("degree2") as HTMLInputElement).value;
        const institution2 = (document.getElementById("institution2") as HTMLInputElement).value;

        const company1 = (document.getElementById("company1") as HTMLInputElement).value;
        const position1 = (document.getElementById("position1") as HTMLInputElement).value;
        const company2 = (document.getElementById("company2") as HTMLInputElement).value;
        const position2 = (document.getElementById("position2") as HTMLInputElement).value;

        const skills = [
            (document.getElementById("skill1") as HTMLInputElement).value,
            (document.getElementById("skill2") as HTMLInputElement).value,
            (document.getElementById("skill3") as HTMLInputElement).value,
            (document.getElementById("skill4") as HTMLInputElement).value,
        ];

        const project1 = (document.getElementById("project1") as HTMLInputElement).value;
        const projectDescription1 = (document.getElementById("projectDescription1") as HTMLTextAreaElement).value;

        const reference1 = (document.getElementById("reference1") as HTMLInputElement).value;
        const referencePhone1 = (document.getElementById("referencePhone1") as HTMLInputElement).value;

        // Generate resume content
        const resumeTemplate = `
            ${profilePictureHTML}
            <h2>Contact Information</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Job Title:</strong> ${jobTitle}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Address:</strong> ${address}</p>

            <h2>Education</h2>
            <p><strong>Degree 1:</strong> ${degree1} at ${institution1}</p>
            <p><strong>Degree 2:</strong> ${degree2 ? degree2 : 'N/A'} at ${institution2 ? institution2 : 'N/A'}</p>

            <h2>Work Experience</h2>
            <p><strong>Company 1:</strong> ${company1} - ${position1}</p>
            <p><strong>Company 2:</strong> ${company2 ? company2 : 'N/A'} - ${position2 ? position2 : 'N/A'}</p>

            <h2>Skills</h2>
            <ul>
                ${skills.filter(skill => skill).map(skill => `<li>${skill}</li>`).join('')}
            </ul>

            <h2>Projects</h2>
            <p><strong>${project1}</strong>: ${projectDescription1}</p>

            <h2>References</h2>
            <p><strong>${reference1}</strong> - ${referencePhone1}</p>
        `;

        const resumeOutput = document.getElementById("resumeOutput") as HTMLElement;
        resumeOutput.innerHTML = resumeTemplate;

        // Re-enable the button after processing
        generateBtn.disabled = false;
    }
}

function downloadPDF() {
    const resumeOutput = document.getElementById("resumeOutput") as HTMLElement;
    const opt = {
        margin: 1,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(resumeOutput).set(opt).save();
}

// Event listeners to trigger resume generation and PDF download
document.getElementById("generateResumeBtn")?.addEventListener("click", generateResume);
document.getElementById("downloadPDFBtn")?.addEventListener("click", downloadPDF);
