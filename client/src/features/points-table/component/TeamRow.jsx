import RecentForm from "./RecentForm";

function TeamRow({ team }) {
    return (
        <tr className="border-t border-lime-500/10">
            <td>{team.pos}</td>

            <td>
                <div>
                    <h3>{team.team}</h3>
                    <p>{team.status}</p>
                </div>
            </td>

            <td>{team.played}</td>
            <td>{team.won}</td>
            <td>{team.lost}</td>
            <td>{team.points}</td>
            <td>{team.nrr}</td>

            <td>
                <RecentForm form={team.recentForm} />
            </td>
        </tr>
    );
}

export default TeamRow;