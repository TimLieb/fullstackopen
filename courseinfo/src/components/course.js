const Course = ({ course }) => {
    const Header = ({ course }) => {
        return (
            <div>
                <h2>{course.name}</h2>
            </div>
        );
    };

    const Content = ({ course }) => {
        return (
            <div>
                {course.parts.map((part) => (
                    <Part key={part.id} part={part} />
                ))}
            </div>
        );
    };

    const Part = ({ part }) => {
        return (
            <p>
                {part.name} {part.exercises}
            </p>
        );
    };

    const Total = ({ course }) => {
        const arr = course.parts.map((a) => a.exercises);
        const total = arr.reduce((s, p) => s + p);

        return <b>total of {total}</b>;
    };

    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    );
};

export default Course;
