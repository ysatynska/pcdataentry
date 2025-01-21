'use client'
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@heroui/react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@heroui/table";

const EvaluationCard = ({ evaluation }: { evaluation: any }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("es-ES", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(date);
        };

  return (
    <Card className="shadow-md outline outline-primary">
      <CardHeader className="justify-center pb-0">
        <h1>{formatDate(evaluation.created_at)}</h1>
      </CardHeader>
      <CardBody>
        <Table aria-label="Evaluation Details">
          <TableHeader>
            <TableColumn>Sección</TableColumn>
            <TableColumn>Descripción</TableColumn>
            <TableColumn>Puntaje</TableColumn>
          </TableHeader>
          <TableBody>
            {evaluation.sections.map((section: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{section.id}</TableCell>
                <TableCell>{section.description}</TableCell>
                <TableCell>
                  {section.score} / {section.total_score}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default EvaluationCard;
