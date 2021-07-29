import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
    showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
    return (
        <Flex align="center">
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>Tulio Gabriel</Text>
                    <Text color="gray.300" fontSize="small">tulliocba@gmail.com</Text>
                </Box>
            )}
            <Avatar size="md" name="Tulio Gabriel" src="https://avatars.githubusercontent.com/u/12241581?v=4" />
        </Flex>
    );
}