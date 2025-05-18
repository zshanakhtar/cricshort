import { api } from "~/trpc/server";
import { MatchCard } from "./_components/schedule/MatchCard";
import { ScheduleClient } from "./_components/schedule/ScheduleClient";

export default async function SchedulePage() {
  const matches = await api.matches.getAllMatches();
  const livematchData = (() => {
    const liveMatch = matches.Matchsummary.find(
      (match) => match.MatchStatus === "Live",
    );
    return liveMatch ? liveMatch : null;
  })();
  if (livematchData) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <MatchCard match={livematchData} clickable />
      </div>
    );
  }
  return (
    <>
      <div className="">
        <p>
          Cricket fever is back, and the{" "}
          <strong>18th edition of the IPL</strong> kicks off with an absolute
          blockbuster as defending champions{" "}
          <strong>Kolkata Knight Riders (KKR)</strong> lock horns with{" "}
          <strong>Royal Challengers Bengaluru (RCB)</strong> in a high-voltage
          opener at the iconic{" "}
          <strong>Eden Gardens, Kolkata, on March 22, 2025!</strong>
        </p>

        <p>
          <br />
          It&#39;s a fresh chapter for both franchises, with{" "}
          <strong>new captains and revamped squads</strong>, setting the stage
          for an electrifying contest.{" "}
          <strong>Ajinkya Rahane takes the reins for KKR</strong>, while{" "}
          <strong>Rajat Patidar leads RCB</strong>, marking a bold new era for
          both teams.
        </p>

        <p>
          <br />
          The subplots couldn&rsquo;t get any juicier!{" "}
          <strong>Phil Salt</strong>, who was a game-changer for KKR last
          season, will now be lining up against them in RCB colors. Alongside{" "}
          <strong>Livingstone, Tim David, and Kohli</strong>, RCB&rsquo;s
          batting arsenal looks nothing short of firepower.
        </p>

        <p>
          <br />
          But the Knights are ready to defend their fortress!{" "}
          <strong>Venkatesh Iyer</strong>, KKR&rsquo;s biggest acquisition, will
          be their key player, while the legendary duo of{" "}
          <strong>Andre Russell and Sunil Narine</strong> remains the backbone
          of their success. Can they deliver yet again?
        </p>

        <p>
          <br />
          <strong>
            Who will draw first blood in IPL 2025? Will KKR start their title
            defense with a bang, or will RCB spoil the party at Eden?
          </strong>{" "}
          Get ready for a night of{" "}
          <strong>thrills, fireworks, and nail-biting drama</strong> as two of
          the league&rsquo;s powerhouses collide in a dream opener!&nbsp;
          <br />
          &nbsp;
        </p>

        <p>
          <strong>
            Head-to-Head in IPL:
            <br />
            <br />
            <img
              alt=""
              src="https://scores.bcci.tv/matchcentre/commentaryFiles/IPL 2025 Head to Head - 640px width_1742566215.gif"
              style={{ width: 640 }}
            />
          </strong>
          <br />
          <br />
          <br />
          <strong>
            <span style={{ color: "#8e44ad" }}>
              Eden Gardens &ndash; A Batting Paradise or a Test of Strategy?
            </span>
          </strong>
        </p>

        <p>
          <br />
          As <strong>KKR and RCB</strong> gear up for the{" "}
          <strong>IPL 2025 opener</strong>, all eyes will be on the pitch at{" "}
          <strong>Eden Gardens</strong>, a venue known for its electric
          atmosphere and shifting trends. Over the years, teams{" "}
          <strong>chasing have held the edge</strong>, winning{" "}
          <strong>55 out of 93 games</strong>, compared to{" "}
          <strong>38 victories for teams batting first</strong>.
        </p>

        <p>
          Historically, the{" "}
          <strong>average first-innings score here stands at 167</strong>, with
          a <strong>powerplay average of 49 runs</strong> and a{" "}
          <strong>death overs surge of 45 runs</strong>. However, the past{" "}
          <strong>three seasons have rewritten the script!</strong>
        </p>

        <p>
          In the <strong>last 16 IPL games</strong> at this venue, teams batting
          first and second have split the wins <strong>evenly at 8 each</strong>
          , signaling a <strong>balanced contest</strong>. More significantly,
          the{" "}
          <strong>average first-innings total has skyrocketed to 196</strong>,
          proving that Eden Gardens is no longer just about
          chasing&mdash;it&rsquo;s now a <strong>big-hitting paradise!</strong>
        </p>

        <p>
          With power-packed lineups on both sides,{" "}
          <strong>
            will KKR&rsquo;s all-rounders dominate the show, or will RCB&rsquo;s
            batting might make Eden their own?
          </strong>{" "}
          One thing is certain&mdash;
          <strong>
            fans are in for a run-fest!
            <br />
            <br />
            <span style={{ color: "#c0392b" }}>
              The Big Battles:
              <br />
              <br />
              <img
                alt=""
                src="https://scores.bcci.tv/matchcentre/commentaryFiles/IPL 2025 - Battles to watch out for_1742645287.gif"
                style={{ width: "640px" }}
              />
            </span>
            <br />
            <br />
            <br />
            TOSS UPDATE:{" "}
            <span style={{ color: "#c0392b" }}>
              &nbsp;
              <img
                alt=""
                src="https://bcci-stats-sports-mechanic.s3.amazonaws.com/matchcentre/images/commentary/smiley/RCB-text.png"
                style={{ height: "18px", width: "40px" }}
                title=""
              />
              &nbsp;Won the Toss and Elected to Field first&nbsp;
              <img
                alt=""
                src="https://bcci-stats-sports-mechanic.s3.amazonaws.com/matchcentre/images/commentary/smiley/ball.png"
                style={{ height: "23px", width: "23px" }}
                title=""
              />
            </span>
          </strong>
          <br />
          <br />
          <br />
          &nbsp;
        </p>
        {/* 
<blockquote className="twitter-tweet">
    <p lang="en" dir="ltr">???? Toss ????
        <br><br>It&#39;s Game 1? and <a href="https://twitter.com/RCBTweets?ref_src=twsrc%5Etfw">@RCBTweets</a>
         won the toss and elected to field against 
         <a href="https://twitter.com/KKRiders?ref_src=twsrc%5Etfw">@KKRiders</a>
         <br><br>Updates ?? <a href="https://t.co/C9xIFpQ63P">https://t.co/C9xIFpQ63P</a>
         <a href="https://twitter.com/hashtag/TATAIPL?src=hash&amp;ref_src=twsrc%5Etfw">#TATAIPL</a>
          | <a href="https://twitter.com/hashtag/KKRvRCB?src=hash&amp;ref_src=twsrc%5Etfw">#KKRvRCB</a>
           <a href="https://t.co/mWq8R4yOE6">pic.twitter.com/mWq8R4yOE6</a>
         </p>
         &mdash; IndianPremierLeague (@IPL) <a href="https://twitter.com/IPL/status/1903444629397131316?ref_src=twsrc%5Etfw">March 22, 2025</a>
         </blockquote> */}
      </div>
      <ScheduleClient matches={matches} />
    </>
  );
}
