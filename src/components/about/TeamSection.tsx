// นามสกุล .JPG ตัวใหญ่ TypeScript ไม่รู้จัก เลยต้องต่อ ?url
import benPic from "../../assets/img/team/ben-pic.JPG?url"
import musePic from "../../assets/img/team/muse-pic.jpg"
import qPic from "../../assets/img/team/q-pic.jpg"

interface TeamMember {
  name: string
  nickname: string
  role: string
  studentId: string
  email: string
  phone: string
  photo: string
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Warantorn Chongkolrat",
    nickname: "Muse",
    role: "PM & Doc",
    studentId: "1660701101",
    email: "warantorn.chon@bumail.net",
    phone: "0806939441",
    photo: musePic,
  },
  {
    name: "Benya Pengkhuean",
    nickname: "Ben",
    role: "Frontend Dev",
    studentId: "1660701341",
    email: "benya.peng@bumail.net",
    phone: "0918515513",
    photo: benPic,
  },
  {
    name: "Chanachol Polketkit",
    nickname: "Q",
    role: "Backend Dev",
    studentId: "1660705755",
    email: "chanachol.polk@bumail.net",
    phone: "0909909923",
    photo: qPic,
  },
]

// สมาชิกทีม 1 คน: รูปวงกลม + ชื่อ + ข้อมูลติดต่อ
function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="flex flex-col items-center text-center">
      <img
        src={member.photo}
        alt={member.name}
        loading="lazy"
        decoding="async"
        className="mb-6 size-44 rounded-full object-cover shadow-md ring-4 ring-white sm:size-40 lg:size-52"
      />
      <h3 className="font-heading text-lg leading-snug font-bold text-cozy-text">
        {member.name}
        <span className="block">({member.nickname})</span>
      </h3>
      <div className="mt-2 text-sm leading-7 text-cozy-muted italic">
        <p>{member.role}</p>
        <p>Student ID: {member.studentId}</p>
        <a href={`mailto:${member.email}`} className="block break-all hover:text-cozy-green hover:underline">
          {member.email}
        </a>
        <a href={`tel:${member.phone}`} className="block hover:text-cozy-green hover:underline">
          {member.phone}
        </a>
      </div>
    </article>
  )
}

export default function TeamSection() {
  return (
    <section className="mt-10 bg-cozy-cream py-16 lg:mt-14 lg:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="mb-12 text-center font-heading text-2xl font-bold text-cozy-green sm:text-3xl">Our Team</h2>
        <div className="grid gap-12 sm:grid-cols-3 sm:gap-8">
          {TEAM_MEMBERS.map((member) => (
            <TeamMemberCard key={member.studentId} member={member} />
          ))}
        </div>
      </div>
    </section>
  )
}
