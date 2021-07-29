import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
    isCurrent?: boolean;
    pageNumber: number;
}

export function PaginationItem({ isCurrent = false, pageNumber }: PaginationItemProps) {
    return isCurrent ?
        (<Button
            size="sm"
            fontSize="xs"
            width="4"
            colorScheme="pink"
            disabled
            _disabled={{
                bgColor: 'pink.500',
                cursor: 'default'
            }}
        >
            {pageNumber}
        </Button>) 
        :
        (<Button
            size="sm"
            fontSize="xs"
            width="4"
            bgColor="gray.700"
            _hover={{
                bg: 'gray.500'
            }}
        >
            {pageNumber}
        </Button>);
}