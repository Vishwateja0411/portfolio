from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://vishwa-portfolio-coral.vercel.app", 
        "https://vishwa-portfolio.vercel.app",
        "http://localhost:5173",
        "http://localhost:8080"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Project(BaseModel):
    id: int
    title: str
    description: str
    link: str
    link_text: str
    disabled: bool = False

class Profile(BaseModel):
    name: str
    role: str
    summary: str
    about: str
    skills: List[str]

class Certificate(BaseModel):
    id: int
    title: str
    issuer: str
    details: str
    image: str
    link: str
    disabled: bool = False

@app.get("/api/profile", response_model=Profile)
async def get_profile():
    return Profile(
        name="Vishwateja Donikena",
        role="Software Developer",
        summary="I build modern, fast, and user-focused web experiences with a strong eye for clean design and reliable functionality.",
        about="I enjoy turning ideas into polished digital products, whether that means a responsive website, a full-stack app, or a thoughtful user experience.",
        skills=[
             "Python, SQL, C++",
            "JavaScript, React, FastAPI, and modern web tools",
            "Artificial Intelligence, Machine Learning and modern AI tools"
        ]
    )

@app.get("/api/projects", response_model=List[Project])
async def get_projects():
    return [
        Project(
            id=1,
            title="Safety-Aware Multi-Agent Financial Assistant",
            description="Developed a FastAPI AI microservice with 4+ workflows for safety screening, intent classification, agent routing, and SSE streaming, including a 95%+ harmful-query recall guard and 12/12 passing tests. Demo runs locally; source code is available on GitHub.",
            link="https://github.com/Vishwateja0411/Safety-Aware-Multi-Agent-Financial-Assistant",
            link_text="View Code →"
        ),
        Project(
            id=2,
            title="Real-Time Expert Session Booking System",
            description="Created a MERN stack booking platform with real-time slot syncing via Socket.io, duplicate-booking protection, and responsive booking workflows for 50+ expert slots and records.",
            link="https://github.com/Vishwateja0411/Expert_Booking_System",
            link_text="View Code →"
        ),
        Project(
            id=3,
            title="RAG-Based Cardiac Decision Support System",
            description="Built an evidence-grounded clinical QA system over a 128-page ESC guideline using Python, LangChain, FAISS, LLaMA 3, and hybrid search. Achieved 85% accuracy, 100% recall, and 85% F1-score with BioBERT-based retrieval.",
            link="#",
            link_text="Under Conference Review",
            disabled=True    
        )
    ]


@app.get("/api/certificates", response_model=List[Certificate])
async def get_certificates():
    return [
        Certificate(
            id=1,
            title="AWS Academy Graduate - AWS Academy Cloud Foundations",
            issuer="AWS Academy",
            details="February 28, 2025",
            image="cert1.png",
            link="cert1.png"
        ),
        Certificate(
            id=2,
            title="Salesforce Certified Agentforce Specialist",
            issuer="Salesforce",
            details="December 29, 2025 • Credential ID 7309200",
            image="cert2.png",
            link="cert2.png"
        ),
        Certificate(
            id=3,
            title="Data Science for Engineers",
            issuer="NPTEL",
            details="Elite, 67%, Jul-Sep 2024",
            image="cert3.png",
            link="cert3.pdf"
        ),
        Certificate(
            id=4,
            title="CCNA: Switching, Routing, and Wireless Essentials",
            issuer="Cisco Networking Academy",
            details="May 2025",
            image="cert4.png",
            link="cert4.pdf"
        )
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
