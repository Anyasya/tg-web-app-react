import {useProjectsStore} from "../../store";
import {useEffect} from "react";
import ProjectList from "../../components/Projects/projectsList";
import './style.css'

export const ProjectsPage = () => {
    const {fetchGetProjects, projects, setProjects} = useProjectsStore()
    useEffect(() => {
        ;(async () => {
            // setIsLoading(true)
            try {
                await fetchGetProjects(0).then((items) => {
                    setProjects(items)
                })
            } catch {
                // setIsMoreApplicants(false)
            } finally {
                // setIsLoading(false)
            }
        })()
    }, []);


    return (
        <div>
            <h1>Проекты, подобранные для вас:</h1>
            <ProjectList projects={projects} />
        </div>
    )
}