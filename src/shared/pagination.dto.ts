import { ApiPropertyOptional } from "@nestjs/swagger";

export class PaginationDto {
    @ApiPropertyOptional()
    limit?: number;

    @ApiPropertyOptional()
    offset?: number;
}