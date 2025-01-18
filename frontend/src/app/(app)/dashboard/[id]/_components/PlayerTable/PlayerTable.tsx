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
          <Table.Th>Name</Table.Th>
          <Table.Th>K/D/A</Table.Th>
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
                <div className="flex items-center space-x-2">
                  <Tooltip
                    label={agentName}
                    color="gray"
                    events={{ hover: true, focus: true, touch: true }}
                  >
                    <Avatar src={agentSrc} alt={agentName} />
                  </Tooltip>
                  <span>{player.riotTag}</span>
                </div>
              </Table.Td>
              <Table.Td>
                {player.kills}/{player.deaths}/{player.assists}
              </Table.Td>
            </Table.Tr>
          );
        })}
      </Table.Tbody>
    </Table>
  );
}
