import {useProjectsStore} from "../../store";
import {useEffect} from "react";
import ProjectList from "../../components/Projects/projectsList";
import './style.css'
import {useTelegram} from "../../hooks/useTelegram";

export const ProjectsPage = () => {
    const {fetchGetProjects, projects, setProjects} = useProjectsStore()
    const {user} = useTelegram();
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
            <h1>Проекты, подобранные для {user?.username}:</h1>
            <ProjectList projects={projects} />
        </div>
    )
}