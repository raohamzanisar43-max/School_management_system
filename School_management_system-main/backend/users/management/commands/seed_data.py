import datetime
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from curriculum.models import Program, Course
from assessments.models import Assessment
from skills_future.models import SkillTrack
from accounts.models import FeeStructure

User = get_user_model()

class Command(BaseCommand):
    help = "Seeds initial database content for testing the homeschooling platform"

    def handle(self, *args, **options):
        self.stdout.write("Seeding database...")

        # 1. Create superuser
        if not User.objects.filter(username="admin").exists():
            admin_user = User.objects.create_superuser(
                username="admin",
                email="admin@brightfuture.edu.pk",
                password="adminpassword",
                role="ADMIN"
            )
            self.stdout.write(self.style.SUCCESS("Superuser 'admin' created successfully with password: adminpassword"))
        else:
            self.stdout.write("Superuser 'admin' already exists.")

        # 2. Create programs
        programs_data = [
            ("MONTESSORI", "Montessori development program for kids"),
            ("PRIMARY", "Primary School curriculum for Grade 1 to 5"),
            ("MIDDLE", "Middle School curriculum for Grade 6 to 8"),
            ("O_LEVEL", "O Levels Cambridge examinations"),
            ("IGCSE", "IGCSE Cambridge examinations"),
            ("GED", "General Educational Development credential"),
        ]
        
        programs = {}
        for code, desc in programs_data:
            prog, created = Program.objects.get_or_create(name=code, defaults={"description": desc})
            programs[code] = prog
            if created:
                self.stdout.write(f"Program '{code}' created.")

        # 3. Create courses
        courses_data = [
            ("MONTESSORI", "Montessori Sensorial Activities", "MON-SEN", "Practical sensory training for cognitive development."),
            ("MONTESSORI", "Montessori Language Exercises", "MON-LAN", "Beginning phonics, reading, and spelling drills."),
            ("PRIMARY", "English Grade 1", "ENG-01", "Primary level grammar, comprehension, and vocabulary."),
            ("PRIMARY", "Mathematics Grade 1", "MAT-01", "Basic arithmetic, counting, shapes, and sums."),
            ("O_LEVEL", "O-Level Physics", "PHY-5054", "Cambridge Physics Syllabus 5054 including Mechanics, Thermal, Waves."),
            ("O_LEVEL", "O-Level Chemistry", "CHM-5070", "Cambridge Chemistry Syllabus 5070 including Stoichiometry, Organic Chemistry."),
            ("GED", "GED Mathematical Reasoning", "GED-MAT", "Mathematical reasoning, algebraic solving, quantitative geometry."),
        ]

        for prog_code, name, code, syllabus in courses_data:
            program = programs[prog_code]
            course, created = Course.objects.get_or_create(
                code=code,
                defaults={"program": program, "name": name, "syllabus": syllabus}
            )
            if created:
                self.stdout.write(f"Course '{name}' ({code}) created.")

        # 4. Create mandatory admission assessment
        assessment, created = Assessment.objects.get_or_create(
            title="General Admission Assessment",
            defaults={
                "description": "Mandatory evaluation of student's capabilities before admission confirmation.",
                "is_admission_test": True
            }
        )
        if created:
            self.stdout.write("Mandatory Admission Assessment created.")

        # 5. Create future skills tracks
        skills_data = [
            ("AI", "BEGINNER", "Introduction to artificial intelligence, neural networks, and prompt engineering"),
            ("AI", "INTERMEDIATE", "Building simple machine learning models using Python and sklearn"),
            ("ROBOTICS", "BEGINNER", "Basic electronics, Arduino simulators, and logical motors control"),
            ("PYTHON", "BEGINNER", "Core python: variables, conditionals, loops, and lists"),
            ("PYTHON", "INTERMEDIATE", "Object-oriented python, basic file I/O, and small gaming scripts using PyGame"),
            ("SCRATCH", "BEGINNER", "Block coding basics, event listeners, sprites, and animations"),
            ("GRAPHIC_DESIGN", "BEGINNER", "UI/UX layout, typography, Figma workspace, and raster/vector design components"),
        ]

        for name, level, desc in skills_data:
            track, created = SkillTrack.objects.get_or_create(
                name=name,
                level=level,
                defaults={"description": desc}
            )
            if created:
                self.stdout.write(f"Skill track '{name}' ({level}) created.")

        # 6. Create Fee structures for programs
        fee_data = [
            ("MONTESSORI", 8000.00, 15000.00),
            ("PRIMARY", 12000.00, 20000.00),
            ("O_LEVEL", 25000.00, 35000.00),
            ("GED", 30000.00, 45000.00),
        ]

        for prog_code, monthly, admission in fee_data:
            if prog_code in programs:
                program = programs[prog_code]
                fee, created = FeeStructure.objects.get_or_create(
                    program=program,
                    defaults={"monthly_tuition": monthly, "admission_fee": admission}
                )
                if created:
                    self.stdout.write(f"Fee structure for '{prog_code}' created.")

        self.stdout.write(self.style.SUCCESS("Database seeding completed successfully!"))
