<script setup lang="ts">
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";
</script>

<template>
  <footer class="absolute px-4 w-full max-w-6xl lg:max-w-7xl self-center bottom-0 my-4 flex flex-row items-center justify-between text-sm text-muted-foreground font-light select-none">
    <small class="text-left">
      2024
      <span class="cursor-pointer">
        <HoverCard>
          <HoverCardTrigger>@coomico</HoverCardTrigger>
          <HoverCardContent class="w-fit text-sm !select-none">
            <div class="flex flex-row justify-center items-center space-x-2">
              <Avatar class="size-6">
                  <AvatarImage src="https://avatars.githubusercontent.com/u/42692043?s=96&v=4" alt="@coomico" />
                  <AvatarFallback>CMC</AvatarFallback>
              </Avatar>
              <div>
                Coomico's other works are
                <a href="https://github.com/coomico" target="blank" class="decoration-1 underline underline-offset-4">here</a>.
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </span>
    </small>

    <small class="text-right">
      来てくれてありがとう
    </small>
  </footer>
</template>