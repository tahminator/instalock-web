import { AgentUuid, agentUuidToNameObject } from "@instalock/types/riot";
import { PlayerMatch } from "@instalock/types";
import { Avatar, Table, Tooltip } from "@mantine/core";
import clsx from "clsx";

export default function PlayerTable({
  players,
  me,
  className,
}: {
  players: PlayerMatch[];
  me: PlayerMatch;
  className?: string;
}) {
  return (
    <Table className={clsx("", className)}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Character</Table.Th>
          <Table.Th>Player Name</Table.Th>
          <Table.Th>Kills</Table.Th>
          <Table.Th>Assists</Table.Th>
          <Table.Th>Deaths</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {players.map((player, idx) => {
          const agentName =
            agentUuidToNameObject[player.characterId as AgentUuid];
          const agentSrc = `/agents/${agentName}.png`;

          const rowBg = (() => {
            if (player.id == me.id) {
              return "bg-yellow-500";
            }

            if (player.teamColor === "Blue") {
              return "bg-blue-300";
            }

            return "bg-red-300";
          })();
          return (
            <Table.Tr key={idx} className={"text-black " + rowBg}>
              <Table.Td>
                <Tooltip
                  label={agentName}
                  color="gray"
                  events={{ hover: true, focus: true, touch: true }}
                >
                  <Avatar src={agentSrc} alt={agentName} className="" />
                </Tooltip>
              </Table.Td>
              <Table.Td>{player.riotTag}</Table.Td>
              <Table.Td>{player.kills}</Table.Td>
              <Table.Td>{player.assists}</Table.Td>
              <Table.Td>{player.deaths}</Table.Td>
            </Table.Tr>
          );
        })}
      </Table.Tbody>
    </Table>
  );
}
