{
  pkgs ? import <nixpkgs> { },
  ...
}:
let
  linuxPkgs = pkgs.lib.optional pkgs.stdenv.isLinux pkgs.inotifyTools;
  macosPkgs = pkgs.lib.optional pkgs.stdenv.isDarwin pkgs.apple-sdk_15;
in
pkgs.mkShell {
  buildInputs = [
    pkgs.envsubst
    pkgs.nodejs
    (pkgs.yarn.override { nodejs = pkgs.nodejs; })
  ]
  ++ linuxPkgs
  ++ macosPkgs;
}
