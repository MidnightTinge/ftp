# WIP

**This project is still a work in progress.**

* **v0.0.1 will mark the first alpha release.**
* **v0.1.0 will mark the first beta release.**
* **v1.0.0 will mark the first stable release.**

# Disclaimer

**⚠ This plugin is NOT AFFILIATED with the official @tailwindlabs/tailwindcss project. This is a
community project. TailwindCSS has not endorsed this project.**

Most of this readme is one massive TODO. I'm pretty busy these days, so this plugin will get work
done as I have both the time and mental bandwidth 🙂 but lucky for me I have a pressing need for
tailwind in my figma mockups so this will probably have work done until it's mostly usable.

# Figma Tailwind Plugin

This is an in-progress plugin meant to scaffold Tailwind styles in a Figma project. Currently,
only colors are implemented.

| Feature            | Status            |
|--------------------|-------------------|
| Colors             | ✅ Done            |
| Box Shadow         | 👷‍♀️ In Progress |
| Typography         | ⏰ Planned         |
| Custom Config      | ⏰ Planned         |
| Config UI          | ⏰ Planned         |
| Custom Key Scoping | ⏰ Planned         |
| Gradients          | ❌ Cancelled [^1]  |
| Blend Modes        | ❓ Considering[^2] |

[^1]: There are way too many gradients to generate. As expected, doing a single sweep of left->right
gradients for every color permutation takes way too long. The script didn't even finish running for
my attempts.

[^2]: I'm unsure if blend modes are useful in the design system at this point.

# Motivation

Tailwind is a complex project, and it doesn't translate well to mockups because of the massive
amount of colors and combinations available. It's like pulling teeth to get this stuff entered into
the system by hand, so this tool exists to let us inject tailwind into any project, whether new or
old. This removes the need to duplicate a community file and then copy things over either from the
duplication or into it.

So in summation, this is yet another tool that was written to solve a problem, but ultimately took
longer to make than it would to solve the problem by hand. But hey, that's
what [engineers do best](https://xkcd.com/1319/) 😎

# Interop

Interopability is currently being built for TailwindCSS v3.1.8. Versions will be extended in the
future.

# License

The figma tailwind plugin is licensed under Apache 2. You can find details in the `LICENSE` file in
this project's root.
