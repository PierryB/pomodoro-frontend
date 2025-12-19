<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    :width="size" 
    :height="size" 
    viewBox="0 0 24 24" 
    fill="none"
    :class="className"
  >
    <!-- Clipboard -->
    <path 
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
      :stroke="color" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    />
    <!-- Check mark -->
    <circle cx="11" cy="13" r="3" fill="none" :stroke="color" stroke-width="1.5"/>
    <path 
      d="M9.5 13l1 1l2-2.5" 
      fill="none" 
      :stroke="color" 
      stroke-width="1.5" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    />
    <!-- Lines -->
    <line x1="15" y1="12" x2="17" y2="12" :stroke="color" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="15" y1="14" x2="17" y2="14" :stroke="color" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: [String, Number],
    default: 24
  },
  color: {
    type: String,
    default: 'currentColor'
  },
  className: {
    type: String,
    default: ''
  }
})
</script>

