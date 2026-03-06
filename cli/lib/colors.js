'use strict';

/**
 * ANSI escape code helpers — zero dependencies.
 */

const RESET   = '\x1b[0m';
const BOLD    = '\x1b[1m';
const DIM     = '\x1b[2m';
const ITALIC  = '\x1b[3m';
const UNDERLINE = '\x1b[4m';

const RED     = '\x1b[31m';
const GREEN   = '\x1b[32m';
const YELLOW  = '\x1b[33m';
const BLUE    = '\x1b[34m';
const MAGENTA = '\x1b[35m';
const CYAN    = '\x1b[36m';
const WHITE   = '\x1b[37m';
const GRAY    = '\x1b[90m';

const BG_GREEN  = '\x1b[42m';
const BG_RED    = '\x1b[41m';
const BG_YELLOW = '\x1b[43m';
const BG_BLUE   = '\x1b[44m';

function bold(s)    { return `${BOLD}${s}${RESET}`; }
function dim(s)     { return `${DIM}${s}${RESET}`; }
function italic(s)  { return `${ITALIC}${s}${RESET}`; }
function red(s)     { return `${RED}${s}${RESET}`; }
function green(s)   { return `${GREEN}${s}${RESET}`; }
function yellow(s)  { return `${YELLOW}${s}${RESET}`; }
function blue(s)    { return `${BLUE}${s}${RESET}`; }
function magenta(s) { return `${MAGENTA}${s}${RESET}`; }
function cyan(s)    { return `${CYAN}${s}${RESET}`; }
function gray(s)    { return `${GRAY}${s}${RESET}`; }
function white(s)   { return `${WHITE}${s}${RESET}`; }

function badge(text, bgColor) {
  return `${bgColor}${BOLD} ${text} ${RESET}`;
}

module.exports = {
  RESET, BOLD, DIM, ITALIC, UNDERLINE,
  RED, GREEN, YELLOW, BLUE, MAGENTA, CYAN, WHITE, GRAY,
  BG_GREEN, BG_RED, BG_YELLOW, BG_BLUE,
  bold, dim, italic, red, green, yellow, blue, magenta, cyan, gray, white,
  badge,
};
